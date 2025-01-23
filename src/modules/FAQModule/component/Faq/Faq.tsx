import { Questions } from "../Questions/Questions.tsx";
import { QuestionItem } from "../QuestionsItem/QuestionItem.tsx";
import { useQuestionsQuery } from "../../api/useQuestionsQuery.tsx";
import { Typography } from "../../../../UI/Typography/Typography.tsx";
import { useState } from "react";
import {Loader} from "../../../../pages/LoaderPage/Loader.tsx";

export const Faq = () => {
    const { data, isLoading, error } = useQuestionsQuery();
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    if (isLoading) return <Loader/>;
    if (error) return <div>...error</div>;
    if (!data) return null;

    return (
        <div>
            <Questions value={selectedValue} onChange={setSelectedValue}>
                {data?.map(({ id, question, answer }) => (
                    <QuestionItem key={id} value={String(id)} trigger={question}>
                        <Typography variant="h4">{answer}</Typography>
                    </QuestionItem>
                ))}
            </Questions>
        </div>
    );
};