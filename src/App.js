import "./App.css";
import React from "react";
import CatFact from "./pages/catfact";
import AgeGenerator from "./pages/ageGenerator";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  Cell,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  Icon24StarCircleFillGreen,
  Icon28RobotOutline,
} from "@vkontakte/icons";

function App() {
  const [activePanel, setActivePanel] = React.useState("panel1");

  return (
    <View activePanel={activePanel}>
      {/* Default view */}
      <Panel id="panel1">
        <PanelHeader>More</PanelHeader>
        <Group>
          <Cell
            expandable="auto"
            before={<Icon24StarCircleFillGreen />}
            onClick={() => setActivePanel("panel2")}
          >
            Cat Facts
          </Cell>
          <Cell
            expandable="auto"
            before={<Icon28RobotOutline />}
            onClick={() => setActivePanel("panel3")}
          >
            Age Generator
          </Cell>
        </Group>
      </Panel>
      {/* Cats-Fact */}
      <Panel id="panel2" centered>
        <PanelHeader
          delimiter="spacing"
          before={<PanelHeaderBack onClick={() => setActivePanel("panel1")} />}
        >
          Cats Fact
        </PanelHeader>
        <CatFact />
      </Panel>
      {/* Age-Generator */}
      <Panel id="panel3" centered>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => setActivePanel("panel1")} />}
        >
          Age-Generator
        </PanelHeader>
        <AgeGenerator />
      </Panel>
    </View>
  );
}

export default App;
