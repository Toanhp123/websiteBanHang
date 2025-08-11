import { Route } from "react-router-dom";
import { RequireAuth } from "@/components/shared";

const privateRoutes = <Route element={<RequireAuth />}></Route>;

export default privateRoutes;
