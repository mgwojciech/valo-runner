import * as React from 'react';
import styles from './ValoRunner.module.scss';
import { IValoRunnerProps } from './IValoRunnerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Player } from '../../../model/Player';
import { GameManager } from '../../../manager/GameManager';
import { Constants } from '../../../utils/Constants';


export default class ValoRunner extends React.Component<{}, {}> {
  public gameManager: GameManager;

  public componentDidMount(){
    this.gameManager = new GameManager(document.getElementById("game-canvas") as HTMLCanvasElement);
    this.gameManager.animate();
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
