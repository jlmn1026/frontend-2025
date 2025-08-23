import FrequencyAudio from "@/features/tinnitus/frequencyAudio";
import PageTitle from "../components/PageTitle";

const Tinnitus = () => {
  return (
    <div>
      <PageTitle>Tinnitus Care</PageTitle>
      <FrequencyAudio initialFrequency={1200} />
      <FrequencyAudio initialFrequency={6500} />
    </div>
  );
};

export default Tinnitus;
