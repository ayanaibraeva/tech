import { Questions} from "../Questions/Questions.tsx";
import {QuestionItem} from "../QuestionsItem/QuestionItem.tsx";
import {useQuestionsQuery} from "../../api/useQuestionsQuery.tsx";
import {Typography} from "../../../../UI/Typography/Typography.tsx";

export const Faq = () => {

    const {data, loading, error} = useQuestionsQuery();

    if(loading) return <div>...loading</div>
    if(error) return <div>...error</div>
    if(!data) return null

    return (
        <div>
            <Questions>
                {data?.map(({id, question, answer}) =>
                    <QuestionItem key={id} value={id} trigger={question}>
                        <Typography variant="h4">{answer}</Typography>
                    </QuestionItem>
                )}
            </Questions>
        </div>
    )
}