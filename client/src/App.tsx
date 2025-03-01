import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Locators from "@/pages/modules/locators";
import RelativeLocators from "@/pages/modules/relative-locators";
import Iframes from "@/pages/modules/iframes";
import Alerts from "@/pages/modules/alerts";
import FormElements from "@/pages/modules/form-elements";
import FileUpload from "@/pages/modules/file-upload";
import CalendarTest from "@/pages/modules/calendar-test";
import Hover from "@/pages/modules/hover";
import DragDrop from "@/pages/modules/drag-drop";
import Waits from "@/pages/modules/waits";
import MultiWindow from "@/pages/modules/multi-window";
import EndToEnd from "@/pages/modules/end-to-end";
import TablesPage from "@/pages/modules/tables";
import FileDownloadPage from "@/pages/modules/download-file.tsx";
import {ShadowDOMPage} from "@/pages/modules/shadow-dom.tsx";
import {BrokenImagesPage} from "@/pages/modules/broken-image.tsx";
import {SliderPage} from "@/pages/modules/slider.tsx";
import {KeyboardPage} from "@/pages/modules/keyboard-actions.tsx";
import {MouseActionsPage} from "@/pages/modules/mouse-action.tsx";

function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/modules/locators" component={Locators} />
            <Route path="/modules/broken-image" component={BrokenImagesPage} />
            <Route path="/modules/slider" component={SliderPage} />
            <Route path="/modules/keyboard-actions" component={KeyboardPage} />
            <Route path="/modules/mouse-actions" component={MouseActionsPage} />
            <Route path="/modules/shadow-dom" component={ShadowDOMPage} />
            <Route path="/modules/relative-locators" component={RelativeLocators} />
            <Route path="/modules/iframes" component={Iframes} />
            <Route path="/modules/alerts" component={Alerts} />
            <Route path="/modules/form-elements" component={FormElements} />
            <Route path="/modules/calendar" component={CalendarTest} />
            <Route path="/modules/hover" component={Hover} />
            <Route path="/modules/file-upload" component={FileUpload} />
            <Route path="/modules/drag-drop" component={DragDrop} />
            <Route path="/modules/waits" component={Waits} />
            <Route path="/modules/multi-window" component={MultiWindow} />
            <Route path="/modules/end-to-end" component={EndToEnd} />
            <Route path="/modules/tables" component={TablesPage} />
            <Route path="/modules/download-file" component={FileDownloadPage} />


            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <Router base="/">
            <QueryClientProvider client={queryClient}>
                <AppRouter />
                <Toaster />
            </QueryClientProvider>
        </Router>
    );
}

export default App;
