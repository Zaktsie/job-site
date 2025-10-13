import { render, screen } from "@testing-library/vue";
import TextInput from "@/components/shared/TextInput.vue";
import userEvent from "@testing-library/user-event";

describe("Testing TextInput Component", () => {
  it("communicates that the user has entered a character", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Zak");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["Z"], ["Za"], ["Zak"]]);
  });
});
