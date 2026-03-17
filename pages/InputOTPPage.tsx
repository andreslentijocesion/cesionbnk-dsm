import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";

export function InputOTPPage() {
  return (
    <ComponentShowcase
      title="Input OTP"
      description="Accessible one-time password component with copy paste functionality."
      category="Forms"
      atomicLevel="Atom"
      preview={
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      }
      code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`}
      props={[
        {
          name: "maxLength",
          type: "number",
          default: "-",
          description: "The number of characters for the OTP.",
          required: true,
        },
        {
          name: "render",
          type: "function",
          default: "-",
          description: "Custom render function for slots (advanced).",
        },
        {
          name: "containerClassName",
          type: "string",
          default: "-",
          description: "Class name for the container.",
        }
      ]}
      examples={[
        {
          title: "Pattern",
          description: "Use a pattern to allow only specific characters (e.g. alphanumeric).",
          preview: (
            <InputOTP maxLength={6} pattern="^[a-zA-Z0-9]+$">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: `<InputOTP maxLength={6} pattern="^[a-zA-Z0-9]+$">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    {/* ... */}
  </InputOTPGroup>
</InputOTP>`
        },
        {
          title: "Separator",
          description: "Group slots with a separator.",
          preview: (
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: `<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`
        }
      ]}
    />
  );
}