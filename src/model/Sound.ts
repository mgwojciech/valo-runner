export class Sound {
    public playSound(path: string) {
        let soundPath = path;
        //@ts-ignore
        const sound = new Audio(soundPath);
        sound.play();
        sound.volume = 0.3;
    };
}