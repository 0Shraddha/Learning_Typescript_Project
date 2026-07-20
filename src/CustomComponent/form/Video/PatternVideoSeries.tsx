import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import { Video } from "lucide-react";
import { SeriesAccordion } from "./SeriesAccordion";

interface PatternVideoSeriesProps {
  handleMediaUpload: (
    file: File, //params1 -- file src
    field: "imageUrl" | "videoUrl", //params2 -- image or video?
  ) => void; //return type void
}

export const PatternVideoSeries = ({
  handleMediaUpload,
}: PatternVideoSeriesProps) => {
  return (
    <div className="postion-relative z-100">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <div
            className="upload-container"
            style={{ border: "1px solid palevioletred" }}
          >
            <div className="icon" style={{ color: "palevioletred" }}>
              <Video />
            </div>
            <div className="text-area">
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Tutorial Video
              </p>
              <span style={{ fontSize: "12px", color: "gray" }}>
                Upload a video tutorial for your pattern
              </span>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-orange-50" style={{ "overflowY" : "scroll", "overflowX" : "scroll"}}>
          <DrawerHeader>
            <DrawerTitle>Upload Videos in different sections</DrawerTitle>
            <DrawerDescription>
              <SeriesAccordion />
            </DrawerDescription>
          </DrawerHeader>
          {/* <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
