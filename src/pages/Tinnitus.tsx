import FrequencyAudio from "@/features/tinnitus/frequencyAudio";
import PageTitle from "../components/PageTitle";

const Tinnitus = () => {
  return (
    <div>
      <PageTitle>Tinnitus Care</PageTitle>
      <FrequencyAudio frequency={1200} />
      <FrequencyAudio frequency={6500} />
    </div>
  );
};

export default Tinnitus;
