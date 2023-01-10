import React from "react";
import Slider, { SliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

interface Mark {
  label: string;
  value: number;
}

const marks: Mark[] = [
  { label: "3", value: 0 },
  { label: "6", value: 19.1 },
  { label: "9", value: 37.5 },
  { label: "12", value: 56.7 },
  { label: "15", value: 75 },
  { label: "50", value: 99.5 },
];

interface Props {
  value: string;
  setValue: (pageSize: string) => void;
}

function PageSlider({ value, setValue }: Props) {
  let innerValue = 0;
  let mark = marks.find((mark) => {
    return mark.label === value;
  });
  if (mark !== undefined) {
    innerValue = mark.value;
  }

  const handleChange = (event: Event, value: number | number[]) => {
    if (!Array.isArray(value) && !isNaN(value)) {
      let mark = marks.find((mark) => {
        return mark.value === value;
      });
      if (mark !== undefined) {
        setValue(mark.label);
      }
    }
  };

  const StyledSlider = styled(Slider)<SliderProps>((props) => {
    return {
      "& .MuiSlider-rail": {
        height: "8px",
        backgroundColor: "#FFFFFF",
        opacity: "0.3",
      },
      "& .MuiSlider-track": {
        height: "8px",
        background: "linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%);",
        border: "none",
      },
      "& .MuiSlider-thumb": {
        height: "26px",
        width: "26px",
        border: "solid 6px #FFD05D",
        backgroundColor: "#1B1B1B",
      },
      "& .MuiSlider-mark": {
        display: "none",
      },
      "& .MuiSlider-markActive": {
        display: "none",
      },
      "& .MuiSlider-markLabel": {
        display: "none",
      },
    };
  });

  return (
    <div className="w-full">
      <div className="w-full pl-[1px]">
        <StyledSlider
          value={innerValue}
          onChange={handleChange}
          step={null}
          marks={marks}
        />
      </div>
      <div className="flex justify-between -mt-[30px] w-full relative">
        <p className="absolute tracking-[0.15px] left-0">3</p>
        <p className="absolute tracking-[0.15px] left-[18.5%]">6</p>
        <p className="absolute tracking-[0.15px] left-[36.8%]">9</p>
        <p className="absolute tracking-[0.15px] left-[55.4%]">12</p>
        <p className="absolute tracking-[0.15px] left-[73.8%]">15</p>
        <p className="absolute tracking-[0.15px] left-[97.9%]">50</p>
      </div>
    </div>
  );
}

export default PageSlider;
