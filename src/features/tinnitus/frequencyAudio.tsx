import { useCallback, useRef } from "react";

type Props = {
  frequency: number;
};

const FrequencyAudio = ({ frequency }: Props) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const playTone = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new window.AudioContext();
    }

    const ctx = audioCtxRef.current;

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    const oscillator = ctx.createOscillator();
    oscillator.type = "sine"; // "sine" | "square" | "sawtooth" | "triangle"
    oscillator.frequency.value = frequency;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.1; // 音量 (0〜1)

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
  };

  const stopTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
  };

  const frequencyUp = useCallback((hz: number) => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value += hz;
    }
  }, []);

  return (
    <>
      <div className="p-4">
        <button
          onClick={() => playTone()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play
        </button>
        <button
          onClick={stopTone}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop
        </button>
        <div>
          <button onClick={() => frequencyUp(100)}>+100Hz</button>
        </div>
      </div>
    </>
  );
};

export default FrequencyAudio;
