import { NotFoundPage } from "@/pages/Customer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";

function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes}
                {privateRoutes}

                {/* Bad Route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoute;
