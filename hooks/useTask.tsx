import { Button, Text } from "@/components/UI";
import { CardContext } from "@/contexts/cardContext";
import {
    CSSProperties,
    useContext,
    useState
} from "react";

/**
 * @interface Пропсов компонента `<TaskComponent />`
 */
export interface ITaskComponentProps {
    title: string,
    children: any,
    next: Function
}

/**
 * Главный хук для обработки логики взаимодействия с заданиями.
 * @returns `<TaskComponent />`, `wrong`, `wrongAnswer()`
 */
export const useTask = () => {
    const { changeScore } = useContext(CardContext);

    /**
     * Локальный стейт для обработки неправильных ответов. НЕ давать компонентам менять его напрямую через `setWrong()`, а только через `wrongAnswer()`!
     * @see `wrongAnswer()`
     * @readonly
     */
    const [wrong, setWrong] = useState(false);

    const wrongAnswer = () => {
        setWrong(true);
        changeScore(-10);
        setTimeout(() => setWrong(false), 2000);
    };

    /**
     * Визуальный компонент-обложка, в который должны быть обёрнуты все задания и теория БЕЗ ИСКЛЮЧЕНИЯ!
     */
    const TaskComponent = ({
        title,
        children,
        next = () => void 0
    }: ITaskComponentProps) => {

        const style = {
            nextButtonArea: {
                position: "absolute",
                bottom: 20
            } as CSSProperties
        }

        return <>
            <div>
                <Text mode="h2">{title}</Text>
                {children}
                <div style={style.nextButtonArea}>
                    <Button onClick={next} color={wrong ? "red" : "blue"}>Готово</Button>
                </div>
            </div>
        </>
    }

    /**
     * НЕ возвращать `setWrong()`! Это может привести к неправильной работе компонента!
     */
    return { TaskComponent, wrong, wrongAnswer };
}