/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import DatePicker from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit } from "lucide-react";
import { statuses } from "@/constants";

function EditDialog({ props }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-1 h-4 w-4" />
          <p className="text-md">Edit</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] p-12">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 justify-center">
          <div>
            <Label htmlFor="title"> Title</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="title"
              type="text"
              placeholder="Title"
              value={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              id="description"
              placeholder="Description"
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-row gap-3 justify-start items-center">
            <div className=" max-w-[200px] ">
              <Label htmlFor="status">Status</Label>
              <Select
                value={props.status}
                onValueChange={(value) => props.setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex flex-row items-center gap-2">
                        <status.icon className="h-5 w-5" /> {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="max-w-[200px]">
              <Label htmlFor="status"> Deadline</Label>
              <DatePicker
                className="max-w-[200px]"
                deadLine={props.deadLine}
                setDeadLine={props.setDeadLine}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={props.handleEdit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
