type ProsTitleSection = {
    text?: string;
};

function TitleSection({ text = "" }: ProsTitleSection) {
    return (
        <h1 className="flex items-center justify-center bg-gray-200 py-12 text-2xl font-bold md:text-3xl">
            {text}
        </h1>
    );
}

export default TitleSection;
