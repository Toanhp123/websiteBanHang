import "./App.css";
import "swiper/css";

import AppRoute from "./routes";
import { useAuth } from "./hooks/useAuth";
import Loading from "./features/loading/components/Loading";

function App() {
    const { loading } = useAuth();

    if (loading) return <Loading />;

    return <AppRoute />;
}

export default App;
