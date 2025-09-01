import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/features/categories/redux/category.slice";
import filterReducer from "@/features/filters/redux/filter.slice";
import cartReducer from "@/features/cart/redux/cart.slice";
import priceReducer from "@/features/checkout/redux/price.slice";
import billDetailReducer from "@/features/checkout/redux/billingDetail.slice";
import promotionReducer from "@/features/checkout/redux/promotion.slice";
import invoiceReducer from "@/features/invoice/redux/invoice.slice";
import allInvoiceDetailReducer from "@/features/invoice/redux/allInvoiceDetail.slice";
import shippingAddressReducer from "@/features/invoice/redux/shippingAddress.slice";
import optionSortProductReducer from "@/features/filters/redux/optionSortProduct.slice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        filter: filterReducer,
        cart: cartReducer,
        price: priceReducer,
        billDetail: billDetailReducer,
        promotion: promotionReducer,
        invoice: invoiceReducer,
        allInvoiceDetail: allInvoiceDetailReducer,
        shippingAddress: shippingAddressReducer,
        optionSortProduct: optionSortProductReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
