import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

import { apiClient } from "@/lib/api-client";
import { useState } from "react";
import { useAppStore } from "../../../../../../store";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { animationDefaultOptions, getColor } from "../../../../../../lib/utils";
import Lottie from "react-lottie";
import { SEARCH_CONTACTS_ROUTE } from "../../../../../../utils/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "../../../../../../utils/constants";

const NewDm = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.contacts) {
          setsearchedContacts(response.data.contacts);
        }
      } else {
        setsearchedContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setsearchedContacts([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start
            hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          {/* only show scroll area if contacts length>0 */}

     

          {/* scroll area */}

          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => {
                    selectNewContact(contact);
                  }}>
                  {/* avatar */}

                  <div className="w-12 h-12 relative">
                    <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black rounded-full"
                        />
                      ) : (
                        <div
                          className={`uppercase w-12 h-12 text-lg  border-[1px] ${getColor(
                            contact.color
                          )} flex items-center justify-center rounded-full`}>
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>

                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : ""}
                    </span>
                    <span className="text-xs">{contact.email}</span>
                  </div>
                </div>
              ))}

              {/* if searched contacts are not there */}





              {searchedContacts.length <= 0 && (
                <div className="flex-1  md:flex mt-5  flex-col justify-center items-center  duration-1000 transition-all">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={animationDefaultOptions}
                    height={100}
                    width={100}
                  />
                  <div className="text-opacity-80 text-white  flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-1000 text-center">
                    <h3 className="poppins-medium">
                      Hi
                      <span className="text-purple-500">!</span> Search new
                      <span className="text-purple-500"> Contact. </span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
