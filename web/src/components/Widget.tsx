import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'


export function Widget() {


    return (
        <Popover className='absolute bottom-6 right-6'>
            <Popover.Panel>Welcome</Popover.Panel>

            <Popover.Button className='
            bg-brand-500  
            text-white 
            rounded-full 
            px-3 h-12 
            flex 
            items-center
            group'>

                <ChatTeardropDots className='w-6 h-6' />

                <span className='
                max-w-0 
                overflow-hidden 
                group-hover:max-w-md transition-all duration-700 ease-linear'>
                    <span className='pl-2'>
                        Feedback
                    </span>
                </span>

            </Popover.Button>
        </Popover>
    )
}