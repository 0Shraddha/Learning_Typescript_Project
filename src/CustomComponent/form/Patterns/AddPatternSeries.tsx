import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../../../components/ui/drawer";
import { Volleyball } from "lucide-react";
import RowsInfosAccordion from "./RowsInfosAccordion";

export const AddPatternSeries = () => {
  return (
    <div className="position-relative z-100">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <div
            className="upload-container"
            style={{ border: "1px solid palevioletred" }}
          >
            <Volleyball style={{ color: "palevioletred" }} />
            <div className="text-area">
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                ADD Patterns
              </p>
              <span style={{ fontSize: "12px", color: "gray" }}>
                Divide the patterns into Sections and Rows. Add infos for simple
                fyi
              </span>
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent style={{ "overflowY" : "scroll", "overflowX" : "scroll"}}>
          <DrawerHeader>
            <DrawerTitle>Create patterns (Add ROWS and INFOS)</DrawerTitle>
            <DrawerDescription>
              <RowsInfosAccordion />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
