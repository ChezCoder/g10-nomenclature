export namespace AudioPlayer {
    export let BASE_PATH = "./dist/assets/audio";

    let audioPlayerElement: HTMLAudioElement;

    export function getAudioPlayerElement(): HTMLAudioElement {
        if (!audioPlayerElement) {
            audioPlayerElement = document.createElement("audio");
            document.body.appendChild(audioPlayerElement);
        }
        return audioPlayerElement;
    }

    export function getAudioPath(folder: string, name: string): string {
        return `${BASE_PATH}/${folder}/${name}.mp3`;
    }

    export async function playAudiosInSequence(...paths: string[]): Promise<void> {
        let seqItem = 0;
        const audioPlayer = getAudioPlayerElement();
        audioPlayer.src = paths[seqItem++];
        audioPlayer.load();

        audioPlayer.oncanplay = () => {
            audioPlayer.play();
        }

        return new Promise((res, rej) => {
            audioPlayer.onerror = rej;

            audioPlayer.onended = () => {
                if (seqItem == paths.length) return res();
                audioPlayer.src = paths[seqItem++];
            }
        });
    }
}