export default function ChristmasCard() {
    const month = new Date().getMonth() + 1;
    let date = new Date().getDate()

    // will dispaly the card
    // 25/ 12 to 5/1
    return (
        <div>
            {(month === 12 || month === 1)

                && (((month === 1 && date <= 5) || date >= 25) &&

                    <div className='rounded-lg border border-primary bg-green-50 border-dashed space-y-2 p-5 text-gray-600 my-10 text-xs text-center'>
                        <p className="italic">
                            e-Cashtrack wishes you a Merry Christmas & Happy new year {new Date().getFullYear() + 1}
                            <br />
                        </p>
                        <p className="text-4xl">🎄🎅 🎉</p>
                    </div>)}
        </div>

    )
}
