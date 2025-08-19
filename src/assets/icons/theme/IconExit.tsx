type IconExitProps = {
  mainColor: string;
}

const IconExit = ({ mainColor }: IconExitProps) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.57031 6.375C7.88344 2.625 9.75213 1.09375 13.843 1.09375H13.9744C18.4895 1.09375 20.2976 2.95833 20.2976 7.61458V14.4063C20.2976 19.0625 18.4895 20.9271 13.9744 20.9271H13.843C9.78243 20.9271 7.91375 19.4167 7.58041 15.7292" stroke={mainColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.7293 11H2.23438" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.4854 7.51074L1.10156 11.0003L4.4854 14.4899" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default IconExit