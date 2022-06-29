import React from 'react'

const BottomContainor = (props) => {
  return (
    <div className="containorBottom w-full flex flex-col justify-center items-center border border-x-slate-300 p-4 bg-slate-50">
        <h1 className='font-semibold text-gray-700'>Account</h1>        
        <h1 className='text-slate-600'>{props.Address.WalletAddress?.substring(0, 5)}...{props.Address.WalletAddress?.substring(props.Address.WalletAddress?.length - 5)}</h1>
    </div>
  )
}

export default BottomContainor