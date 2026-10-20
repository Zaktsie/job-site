import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import ProfileView from "@/views/ProfileView.vue";
import { useUserStore } from "@/stores/user";

describe("ProfileView", () => {
  const renderProfileView = () => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(ProfileView, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: { query: {} },
          $router: { push: vi.fn() },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { userStore };
  };

  it("allows user to sign in from the sign-in form when logged out", async () => {
    const { userStore } = renderProfileView();
    expect(userStore.isLoggedIn).toBe(false);

    const signInButton = screen.getByRole("button", {
      name: /sign in to account/i,
    });
    await userEvent.click(signInButton);

    expect(userStore.isLoggedIn).toBe(true);
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
  });

  it("allows logged-in user to update their profile and sign out", async () => {
    const { userStore } = renderProfileView();
    userStore.loginUser();

    const nameInput = await screen.findByLabelText(/full name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Alex Rivera");

    const saveButton = screen.getByRole("button", {
      name: /save profile changes/i,
    });
    await userEvent.click(saveButton);

    expect(userStore.userProfile.name).toBe("Alex Rivera");

    const signOutButton = screen.getByRole("button", {
      name: /sign out/i,
    });
    await userEvent.click(signOutButton);
    expect(userStore.isLoggedIn).toBe(false);
  });
});
