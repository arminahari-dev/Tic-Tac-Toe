interface ShowWinnerProps {
  winner: string;
}

const ShowWinner: React.FC<ShowWinnerProps> = ({ winner }) => {
  return <div>{`${winner} Wins!`}</div>;
}

export default ShowWinner;
