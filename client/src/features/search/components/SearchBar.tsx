function SearchBar() {
    return (
        <div className="flex h-full w-full items-center">
            <div className="flex h-full max-h-2/3 w-full max-w-5/6 rounded-xl bg-[oklch(0.65_0.14_153.24)]">
                <div
                    className={
                        "relative flex flex-3/9 items-center justify-center gap-2 text-white " +
                        "after:absolute after:top-1/2 after:-right-0 after:h-2/4 after:w-px after:-translate-y-1/2 after:bg-white after:opacity-50 after:content-['']"
                    }
                >
                    <p>All Categories</p>
                    <i className="fa-solid fa-caret-down"></i>
                </div>

                <input
                    className="mx-4 flex-6/8 text-white focus:outline-none"
                    type="text"
                    placeholder="Search for product..."
                />
            </div>
        </div>
    );
}

export default SearchBar;
