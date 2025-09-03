type CardItemPros = {
    text: string;
    value: number;
};

function CardItem({ text, value }: CardItemPros) {
    return (
        <div className="rounded-2xl bg-white p-4 text-center shadow">
            <h2 className="text-lg font-bold">{text}</h2>
            <p className="text-2xl font-semibold text-blue-600">{value}</p>
        </div>
    );
}

export default CardItem;
