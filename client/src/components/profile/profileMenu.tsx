import MenuButton from "./menuButton";

interface MenuProps {
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProfileMenu = ({ handleButtonClick }: MenuProps) => {
  return (
    <section className="flex flex-col flex-grow justify-center w-full p-5 space-y-10">
      <MenuButton
        icon="menu_book"
        label="Account Information"
        handleButtonClick={handleButtonClick}
      />
      <MenuButton
        icon="account_circle"
        label="Personal Information"
        handleButtonClick={handleButtonClick}
      />
      <MenuButton
        icon="person_book"
        label="Biography Information"
        handleButtonClick={handleButtonClick}
      />
      <MenuButton
        icon="share"
        label="Social Media Links"
        handleButtonClick={handleButtonClick}
      />
    </section>
  );
};

export default ProfileMenu;
