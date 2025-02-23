import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Locators from "@/pages/modules/locators";
import Iframes from "@/pages/modules/iframes";
import Alerts from "@/pages/modules/alerts";
import FormElements from "@/pages/modules/form-elements";
import CalendarTest from "@/pages/modules/calendar-test";
import Hover from "@/pages/modules/hover";
import DragDrop from "@/pages/modules/drag-drop";
import Waits from "@/pages/modules/waits";
import MultiWindow from "@/pages/modules/multi-window";
import EndToEnd from "@/pages/modules/end-to-end";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/modules/locators" component={Locators} />
      <Route path="/modules/iframes" component={Iframes} />
      <Route path="/modules/alerts" component={Alerts} />
      <Route path="/modules/form-elements" component={FormElements} />
      <Route path="/modules/calendar" component={CalendarTest} />
      <Route path="/modules/hover" component={Hover} />
      <Route path="/modules/drag-drop" component={DragDrop} />
      <Route path="/modules/waits" component={Waits} />
      <Route path="/modules/multi-window" component={MultiWindow} />
      <Route path="/modules/end-to-end" component={EndToEnd} />
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
