import { TablistComponent } from "./Tabs/tablistComponent.jsx";

export function HomepageComponent() {
  return (
    <div className="bg-purple-50 h-screen flex flex-col items-center pt-20">
      <h1 className="text-blue-900 text-3xl m-5"> Let the chatting begin!</h1>
      <TablistComponent />
    </div>
  );
}
