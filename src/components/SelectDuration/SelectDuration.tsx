import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import style from "./selectDuration.module.css";
import Button from "../Button/Button";

type DurationOption = {
    label: string;
    value: number;
};

interface SelectDurationProps {
    handleDuration: (value: DurationOption) => void
    close: () => void
}

export function SelectDuration({ handleDuration, close }: SelectDurationProps) {
    const [selectedHour, setSelectedHour] = useState(1);
    const [previousHour, setPreviousHour] = useState(0);
    const [afterHour, setAfterHour] = useState(2);
    
    const [selectedMinute, setSelectedMinute] = useState(0); 
    const [previousMinute, setPreviousMinute] = useState(0);
    const [afterMinute, setAfterMinute] = useState(1);

    const [isAnimatingHour, setIsAnimatingHour] = useState(false);
    const [isAnimatingMinute, setIsAnimatingMinute] = useState(false);

    const handleWheelHour = (e: React.WheelEvent<HTMLDivElement>) => {        
        setPreviousHour(selectedHour);
        if (e.deltaY < 0) {
            setSelectedHour((prev) => Math.min(prev + 1, 23));
        } else {
            setSelectedHour((prev) => Math.max(prev - 1, 0));
        }
        if (selectedHour < 23) {
            setAfterHour(selectedHour + 1);
        }
        
        setIsAnimatingHour(true);
    };

    const handleWheelMinutes = (e: React.WheelEvent<HTMLDivElement>) => {
        setPreviousMinute(selectedMinute);
        if (e.deltaY < 0) {
            setSelectedMinute((prev) => Math.min(prev + 1, 59));
        } else {
            setSelectedMinute((prev) => Math.max(prev - 1, 0));
        }
        if (selectedMinute < 59) {
            setAfterMinute(selectedMinute + 1);
        }


        setIsAnimatingMinute(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingHour(false);
            setIsAnimatingMinute(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [selectedHour, selectedMinute]);

    const formatMinute = (minute: number) => String(minute).padStart(2, '0');

    return (
        <Modal.Root>
            <Modal.Close onClick={() => {close()}}  />
            <Modal.Title>Duração</Modal.Title>
            <div className={style.container}>
                <div className={style.display} onWheel={handleWheelHour}>
                    <div className={style.hoursBefore}>{previousHour}</div>
                    <div className={style.line} />
                    <div className={`${style.hoursSelect} ${isAnimatingHour ? style.animate : ''}`}>
                        <div>{selectedHour}</div>
                        <div>H</div>
                    </div>
                    <div className={style.line} />
                    <div className={style.hoursAfter}>{afterHour}</div>
                </div>
                
                <div className={style.display} onWheel={handleWheelMinutes}>
                    <div className={style.minutesBefore}>{formatMinute(previousMinute)}</div>
                    <div className={style.line} />
                    <div className={`${style.minutesSelect} ${isAnimatingMinute ? style.animate : ''}`}>
                        <div>{formatMinute(selectedMinute)}</div> 
                        <div>M</div>
                    </div>
                    <div className={style.line} />
                    <div className={style.minutesAfter}>{formatMinute(afterMinute)}</div> 
                </div>
            </div>
            <Button name="Salvar" variant="standard" onClick={()=> {
                const totalMinutes = ((selectedHour * 60) + selectedMinute) * 60;
                const hourLabel = selectedHour > 0 ? `${selectedHour} horas` : "";
                const minuteLabel = selectedMinute > 0 ? `${formatMinute(selectedMinute)} minutos` : "";
                
                const label = `${hourLabel}${hourLabel && minuteLabel ? ' e ' : ''}${minuteLabel}`.trim();
                
                if (totalMinutes > 0) {
                  handleDuration({ label, value: totalMinutes });
                }
            }}></Button>
        </Modal.Root>
    );
}
