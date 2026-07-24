import Button from "../components/ui/Button/Button";
import Card from "../components/ui/Card/Card";
import Input from "../components/ui/Input/Input";

export default function AppRoutes() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <Card>
        <div className="space-y-5 w-96">

          <h1 className="text-3xl font-bold">
            AIerview
          </h1>

          <Input
            label="Email"
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
          />

          <Button>
            Login
          </Button>

        </div>
      </Card>
    </div>
  );
}