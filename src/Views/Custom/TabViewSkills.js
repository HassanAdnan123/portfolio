import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import Icon from '../Layout/Icons/Icon';
import './TabViewSkills.css';


export default function TabViewSkills() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tabsMain'>
            <TabPanel header="Frontend">
                <div className='icon-grid'>
                    <Icon name="react" title="ReactJs" />
                    <Icon name="angular" title="Angular (8+)"/>
                    <Icon name="ionic" title="Ionic"/>
                    <Icon name="html" title="HTML" />
                    <Icon name="css" title="CSS" />
                </div>
                

            </TabPanel>
            <TabPanel headerClassName="tabPanel" header="Backend">
                <div className='icon-grid'>
                    <Icon name="java" title="Java"/>
                    <Icon name="spring" title="Springboot"/>
                    <Icon name="nodejs" title="Node Js"/>
                    <Icon name="csharp" title=".NET"/>
                </div>  
            </TabPanel>
            <TabPanel header="Databases">
                <div className='icon-grid'>
                    <Icon name="mongo" title="MongoDB"/>
                    <Icon name="mysql" title="My SQL"/>
                    <Icon name="postgres" title="postgreSQL"/>
                    <Icon name="sqlserver" title="MS SQL Server"/>
                    <Icon name="oracle" title="PL-SQL"/>
                </div>
            </TabPanel>
            <TabPanel header="Tools">
                <div className='icon-grid'>
                    <Icon name="vscode" title="VS Code"/>
                    <Icon name="intellij" title="IntelliJ Idea"/>
                    <Icon name="github" title="Github Desktop"/>
                    <Icon name="dbeaver" title="Dbeaver DB Client"/>
                </div>
                
            </TabPanel>
        </TabView>
    </div>
  )
}
