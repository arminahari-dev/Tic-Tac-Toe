interface ShowWinnerProps {
  winner: string;
}

function ShowWinner({ winner }: ShowWinnerProps) {
  return <div>{`${winner} Wins!`}</div>;
}

export default ShowWinner;
