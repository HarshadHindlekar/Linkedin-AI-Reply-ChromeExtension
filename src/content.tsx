import cssText from "data-text:~styles.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useState } from "react"
import { MdOutlineModeEdit } from "react-icons/md"

import Modal from "./Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector(".msg-form__contenteditable")

export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoOverlay = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const textarea = document.querySelector(".msg-form__contenteditable") as HTMLTextAreaElement;

  const handleFocus = () => { setIsFocused(true) };
  const handleBlur = () => {
    setTimeout(() => {
      if (isOpen) {
        setIsFocused(false);
      }
    }, 100);
  };

  textarea.addEventListener("focus", handleFocus);
  textarea.addEventListener("blur", handleBlur);


  return (
    <>
      {isFocused
        ? <div className={`absolute top-[7rem] left-[38rem] bg-white rounded-full p-2 cursor-pointer`}>
          <MdOutlineModeEdit
            onClick={() => { setIsOpen(true) }}
            className={`text-xl text-blue-600 shadow-sm`}
          />
        </div>
        : null}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}

export default PlasmoOverlay;
