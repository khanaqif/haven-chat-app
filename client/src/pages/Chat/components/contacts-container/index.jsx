import havenLogo from "@/assets/havenLogo.png";
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";
import { useEffect } from "react";
import { GET_CONTACTS_WITH_MESSAGES_ROUTE } from "../../../../utils/constants";
import { useAppStore } from "../../../../store";
import ContactList from "../../../../components/contact-list";
import { apiClient } from "../../../../lib/api-client";

const ContactsContainer = () => {
  /* dm contacts list */

  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_CONTACTS_WITH_MESSAGES_ROUTE, {
        withCredentials: true,
      });

      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    getContacts();
  }, [setDirectMessagesContacts]);
  return (
    <div
      className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw]
    
    bg-[#1b1c24] border-r-2 border-[#2f303b]  w-full">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        {/* dm contact list */}
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>

        {/*  */}
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <img src={havenLogo} alt="Custom Logo" className="h-11 w-auto" />

      <span className="text-3xl font-semibold ">Haven</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-heavy text-opacity-90 text-m">
      {text}
    </h6>
  );
};
