import { render, screen } from '@testing-library/vue';

import  MainNav from '@/components/MainNav.vue';


describe("MainNav", () => {
    it('displays company name', () => {
        render(MainNav);
        const  companyName =  screen.getByText("Google Careers");
        expect(companyName).toBeInTheDocument();
    });
    it('displays menu items for navigations', () => {
        render(MainNav);
       const navMenuItems = screen.getAllByRole("listitem")
        const navMenuItemTexts = navMenuItems.map(
            (item) =>  item.textContent
        );
       expect(navMenuItemTexts).toEqual([
               "Teams",
               "Jobs",
               "Location",
               "Benefits",
               "Students",
           ]
       )
        console.log(navMenuItemTexts)
    })
});
