import * as React from 'react';
import styles from './ValoRunner.module.scss';
import { IValoRunnerProps } from './IValoRunnerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Player } from '../../../model/Player';
import { GameManager } from '../../../manager/GameManager';
import { Constants } from '../../../utils/Constants';
//import {audio} from "../../../model/Audio";
import { LeaderBoardManager } from '../../../manager/LeaderBoardManager';
import { LeaderBoardProvider } from '../../../dal/LeaderBoardProvider';


export default class ValoRunner extends React.Component<IValoRunnerProps, {}> {
  public gameManager: GameManager;

  public componentDidMount(){
    let provider = new LeaderBoardProvider(this.props.spContext);
    let user = this.props.spContext.pageContext.user.displayName;
    this.gameManager = new GameManager(document.getElementById("game-canvas") as HTMLCanvasElement, new LeaderBoardManager(provider, user));
    this.gameManager.animate();
    this.gameManager.playAudio();
  }

  public render(): React.ReactElement<IValoRunnerProps> {
    return (
      <div className={ styles.valoRunner }>
        <canvas id="game-canvas" width={Constants.gameCanvasWidth} height={Constants.gameCanvasHeight} style={{width: "100%", border: "1px solid black"}}>
        </canvas>
      </div>
    );
  }
}   
