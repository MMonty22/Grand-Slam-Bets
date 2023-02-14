class Game < ApplicationRecord
    has_many :bets
    has_many :comments, through: :bets
    has_many :hitters
    has_many :pitchers

    def assign_players
        Hitter.all.each do |hit|
            if hit.team == self.away_team
                hit.update(game_id: self.id)
            elsif hit.team == self.home_team
                hit.update(game_id: self.id)
            end
        end
        Pitcher.all.each do |pitch|
            if pitch.team == self.away_team
                pitch.update(game_id: self.id)
            elsif pitch.team == self.home_team
                pitch.update(game_id: self.id)
            end
        end
    end
end