import FAQsAtom from "@/components/atoms/custom/FAQsAtom";
import { FAQsType } from "src/types";

export default function FrequentAskedQuestion() {

    const faqs: FAQsType[] = [
        {
            question: "Question One",
            answer: "Answer One"
        },
        {
            question: "Question Two",
            answer: "Answer Two"
        },
        {
            question: "Question Three",
            answer: "Answer Three"
        },
        {
            question: "Question Four",
            answer: "Answer Four"
        },

    ]

    return (
        <div className="flex justify-center mt-4">
            <div className="block w-full md:w-2/5 bg-white px-7 py-5">
                <h3 className="text-black bold">Frequent Asked Question (FAQ)</h3>

                <div>

                    {
                        faqs.map((faqs: FAQsType, i: number) => {
                            {
                                return (
                                    <FAQsAtom question={faqs.question} answer={faqs.answer} key={i} />
                                )
                            }
                        })
                    }
                </div>

                {/* <p>Can I share ExTra with my friend?</p>
                <p>How to get started?</p>
                <p>Updating profile settings</p>
                <p>Why I don’t get notification?</p>
                <p>How to add an expense</p>
                <p>Do you charge fees for making budgets</p> */}
            </div>
        </div>

    )
}