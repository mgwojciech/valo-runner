import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import { LeaderBoard } from "../model/LeaderBoard";

export class LeaderBoardProvider{
    private siteRelativePath: string;
    public fileName: string = "Valo-Runner-Leaderboard.json";
    protected folderWebRelativePath: string = "/Shared%20Documents";
    constructor(protected spContext: WebPartContext){
        this.siteRelativePath = spContext.pageContext.site.serverRelativeUrl;
    }
    public async getLeaderboard(): Promise<LeaderBoard>{
        try {
			const configFileUrl = `${this.getBaseUrl()}/_api/web/getFileByServerRelativeUrl('${this.getFolderRelativePath()}/${this.fileName}')/$value`;
			const configResponse = await this.spContext.spHttpClient.get(configFileUrl, SPHttpClient.configurations.v1);

			if (configResponse && configResponse.ok) {
				return await configResponse.json();
			}
		} catch (ex) {
			return null;
		}
    }
    
	public async updateLeaderboard<T>(leaderboard: LeaderBoard): Promise<void> {
		const payload = this.createPayloadBlob(leaderboard);
		const configFileUrl = `${this.getBaseUrl()}/_api/web/GetFolderByServerRelativeUrl('${this.getFolderRelativePath()}')/Files/add(url='${this.fileName}', overwrite=true)`;
		const configResponse = await this.spContext.spHttpClient.post(configFileUrl, SPHttpClient.configurations.v1, {
			headers: {
				accept: "application/json",
				"content-length": `${payload.size}`,
			},
			body: payload,
		});

		if (!configResponse || !configResponse.ok) {
			throw "Update fails";
		}
	}
	public createPayloadBlob<T>(body: T): Blob {
		const payload = new Blob([JSON.stringify(body, null, 2)], { type: "application/json" });
		return payload;
	}
    private getBaseUrl(): string {
		return /^\//.test(this.siteRelativePath) ? this.siteRelativePath : `/${this.siteRelativePath}`;
	}

	private getFolderRelativePath(): string {
		return this.getBaseUrl() + this.folderWebRelativePath;
	}
}