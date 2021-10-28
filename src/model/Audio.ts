import { findScrollableParent } from "@uifabric/utilities";
import { Constants } from "../utils/Constants";
import ValoRunner from "../webparts/valoRunner/components/ValoRunner";

export class audio extends ValoRunner {
    public playAudio() {
        const music = new Audio("backgroundMusic.mp3");
        music.play();
        music.volume = 0.3;
        music.loop = true;
    };

};