// TODO: cần làm tiếp
function UpdateMyOrder() {
    const listBill = [
        {
            id: 1,
            product: [
                {
                    id: 1,
                    name: "test",
                },
            ],
            price: 100,
            date: new Date(),
        },
        {
            id: 2,
            product: [
                {
                    id: 2,
                    name: "test",
                },
            ],
            price: 100,
            date: new Date(),
        },
    ];

    return (
        <div>
            {listBill.map((item, index) => (
                <div key={index}>{item.price}</div>
            ))}
        </div>
    );
}

export default UpdateMyOrder;
