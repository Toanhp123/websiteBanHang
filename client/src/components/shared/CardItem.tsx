type CardItemPros = {
    text: string;
    icon: string;
    value: number;
};

function CardItem({ text, icon, value }: CardItemPros) {
    return (
        <div className="flex flex-1 items-center gap-4 rounded-2xl bg-white px-8 py-6">
            <div className="bg-secondary-light flex h-12 w-12 items-center justify-center rounded-full">
                <i className={`${icon} text-main-primary`}></i>
            </div>

            <div className="text-[18px] font-semibold">
                <p>{text}</p>
                <p className="text-disable">{value}</p>
            </div>
        </div>
    );
}

export default CardItem;
