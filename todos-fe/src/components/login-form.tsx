/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardWithForm({ login }: any) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>You need to login to manage you tasks</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-4 justify-between">
        <Button onClick={login} className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
