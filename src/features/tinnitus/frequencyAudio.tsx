import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  initialFrequency: number;
};

const FrequencyAudio = ({ initialFrequency }: Props) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [frequencyValue, setFrequencyValue] =
    useState<number>(initialFrequency);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new window.AudioContext();
    }

    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    oscillator.type = "sine"; // "sine" | "square" | "sawtooth" | "triangle"
    oscillator.frequency.value = frequencyValue;

    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    oscillator.start();
    oscillatorRef.current = oscillator;

    oscillatorRef.current.stop();
    oscillatorRef.current.disconnect();
    oscillatorRef.current = null;

    return () => {
      stopTone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playTone = useCallback(() => {
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
    oscillator.frequency.value = frequencyValue;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.1;
    gainNodeRef.current = gainNode;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
    setPlaying(true);
  }, [frequencyValue]);

  const stopTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
      setPlaying(false);
    }
  };

  const frequencyChange = useCallback((hz: number) => {
    if (oscillatorRef.current) {
      if (oscillatorRef.current.frequency.value) {
        oscillatorRef.current.frequency.value += hz;
        setFrequencyValue(oscillatorRef?.current?.frequency.value ?? 0);
      }
    }
  }, []);

  const changeVolume = useCallback((positive: boolean) => {
    if (gainNodeRef.current) {
      if (gainNodeRef.current.gain.value) {
        gainNodeRef.current.gain.value += 0.05 * (positive ? 1 : -1);
      }
    }
  }, []);

  return (
    <div
      className={`flex flex-col gap-2 p-2 ${
        playing ? "bg-blue-300 border-b border-white" : ""
      }`}
    >
      <div className="pb-2 flex gap-2">
        <Button onClick={() => playTone()}>Play</Button>
        <Button variant="outline" onClick={stopTone}>
          Stop
        </Button>
        <div className="ml-8 flex gap-2 items-center">
          <div>Volume</div>
          <Button onClick={() => changeVolume(false)}>-</Button>
          <Button onClick={() => changeVolume(true)}>+</Button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" onClick={() => frequencyChange(-1000)}>
          -1000Hz
        </Button>
        <Button variant="outline" onClick={() => frequencyChange(-500)}>
          -500Hz
        </Button>
        <Button variant="outline" onClick={() => frequencyChange(-100)}>
          -100Hz
        </Button>
        <div className="w-20 text-center">{frequencyValue ?? "~"}Hz</div>
        <Button variant="outline" onClick={() => frequencyChange(100)}>
          +100Hz
        </Button>
        <Button variant="outline" onClick={() => frequencyChange(500)}>
          +500Hz
        </Button>
        <Button variant="outline" onClick={() => frequencyChange(1000)}>
          +1000Hz
        </Button>
      </div>
    </div>
  );
};

export default FrequencyAudio;
