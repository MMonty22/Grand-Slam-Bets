class Game < ApplicationRecord
    has_many :bets
    has_many :comments, through: :bets
    has_many :users, through: :bets
    has_many :hitters
    has_many :pitchers
    validates :away_team, uniqueness: true
    validates :away_team, presence: true
    validates :home_team, uniqueness: true
    validates :home_team, presence: true
    validates :away_team_SP, presence: true
    validates :home_team_SP, presence: true
    validates :away_team_SP, uniqueness: true
    validates :home_team_SP, uniqueness: true
    validate :home_team_SP_exists
    validate :away_team_SP_exists

    def home_team_SP_exists
        unless Pitcher.all.find_by(name: self.home_team_SP)
            errors.add(:home_team_SP, "does not exist in our database, please check your spelling or try again")
        end
    end

    def away_team_SP_exists
        unless Pitcher.all.find_by(name: self.away_team_SP)
            errors.add(:away_team_SP, "does not exist in our database, please check your spelling or try again")
        end
    end

    def assign_players
        Hitter.all.each do |hit|
            if hit.team == self.away_team
                hit.update(game_id: self.id)
            elsif hit.team == self.home_team
                hit.update(game_id: self.id)
            end
        end
        Pitcher.all.each do |pitch|
            if pitch.name == self.away_team_SP
                pitch.update(game_id: self.id)
            elsif pitch.name == self.home_team_SP
                pitch.update(game_id: self.id)
            end
        end
    end

    AVG_WOBA = 0.315
    AVG_ISO = 0.164
    AVG_HARD_CONTACT = 0.319
    AVG_HR_PER_FB = 0.133

    def get_home_and_away_players
        @away_pitcher = Pitcher.all.filter{|pit| pit.name == self.away_team_SP}
        @home_pitcher = Pitcher.all.filter{|pit| pit.name == self.home_team_SP}
        @away_hitters = Hitter.all.filter{|hit| hit.game_id == self.id && hit.team == self.away_team}
        @home_hitters = Hitter.all.filter{|hit| hit.game_id == self.id && hit.team == self.home_team}
    end

    def calc_ex_woba
        @away_hitters.each do |hit|
            if @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_woba_vs_l: (@home_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'
                hit.update(ex_woba_vs_l: (@home_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_woba_vs_l: (@home_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_l)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_woba_vs_r: (@home_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'
                hit.update(ex_woba_vs_r: (@home_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_woba_vs_r: (@home_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_r) 
            end
        end
        @home_hitters.each do |hit|
            if @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_woba_vs_l: (@away_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'    
                hit.update(ex_woba_vs_l: (@away_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_woba_vs_l: (@away_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_l)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_woba_vs_r: (@away_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'    
                hit.update(ex_woba_vs_r: (@away_pitcher[0].woba_vs_r/AVG_WOBA) * hit.woba_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_woba_vs_r: (@away_pitcher[0].woba_vs_l/AVG_WOBA) * hit.woba_vs_r)
            end
        end
    end

    def calc_ex_iso
        @away_hitters.each do |hit|
            if @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_iso_vs_l: (@home_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'
                hit.update(ex_iso_vs_l: (@home_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_iso_vs_l: (@home_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_l)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_iso_vs_r: (@home_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'
                hit.update(ex_iso_vs_r: (@home_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_iso_vs_r: (@home_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_r) 
            end
        end
        @home_hitters.each do |hit|
            if @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_iso_vs_l: (@away_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'    
                hit.update(ex_iso_vs_l: (@away_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_iso_vs_l: (@away_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_l)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_iso_vs_r: (@away_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'    
                hit.update(ex_iso_vs_r: (@away_pitcher[0].iso_vs_r/AVG_ISO) * hit.iso_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_iso_vs_r: (@away_pitcher[0].iso_vs_l/AVG_ISO) * hit.iso_vs_r)
            end
        end
    end

    def calc_ex_hc
        @away_hitters.each do |hit|
            if @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_hard_contact_vs_l: (@home_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'
                hit.update(ex_hard_contact_vs_l: (@home_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_hard_contact_vs_l: (@home_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_hard_contact_vs_r: (@home_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'
                hit.update(ex_hard_contact_vs_r: (@home_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_hard_contact_vs_r: (@home_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r) 
            end
        end
        @home_hitters.each do |hit|
            if @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_hard_contact_vs_l: (@away_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'    
                hit.update(ex_hard_contact_vs_l: (@away_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_hard_contact_vs_l: (@away_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_l)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_hard_contact_vs_r: (@away_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'    
                hit.update(ex_hard_contact_vs_r: (@away_pitcher[0].hard_contact_pct_vs_r/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_hard_contact_vs_r: (@away_pitcher[0].hard_contact_pct_vs_l/AVG_HARD_CONTACT) * hit.hard_contact_pct_vs_r)
            end
        end
    end

    def calc_ex_hr_per_fb
        @away_hitters.each do |hit|
            if @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_hr_per_fb_vs_l: (@home_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'
                hit.update(ex_hr_per_fb_vs_l: (@home_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @home_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_hr_per_fb_vs_l: (@home_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_hr_per_fb_vs_r: (@home_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'
                hit.update(ex_hr_per_fb_vs_r: (@home_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r)
            elsif @home_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_hr_per_fb_vs_r: (@home_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r) 
            end
        end
        @home_hitters.each do |hit|
            if @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'L'
                hit.update(ex_hr_per_fb_vs_l: (@away_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'R'    
                hit.update(ex_hr_per_fb_vs_l: (@away_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @away_pitcher[0].throw_hand == 'L' && hit.bat_hand == 'S'
                hit.update(ex_hr_per_fb_vs_l: (@away_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_l)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'L'
                hit.update(ex_hr_per_fb_vs_r: (@away_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'R'    
                hit.update(ex_hr_per_fb_vs_r: (@away_pitcher[0].hr_per_fb_vs_r/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r)
            elsif @away_pitcher[0].throw_hand == 'R' && hit.bat_hand == 'S'
                hit.update(ex_hr_per_fb_vs_r: (@away_pitcher[0].hr_per_fb_vs_l/AVG_HR_PER_FB) * hit.hr_per_fb_vs_r)
            end
        end
    end

    def calc_matchup_rating
        @away_hitters.each do |hit|
            if @home_pitcher[0].throw_hand == 'L'
                hit.update(matchup_rating_vs_l: (((hit.ex_woba_vs_l)*0.2) + ((hit.wrc_plus_vs_l/1000)*0.2) + ((hit.ex_hard_contact_vs_l + hit.ex_iso_vs_l)*0.5) + (hit.ex_hr_per_fb_vs_l)*0.1))
            elsif @home_pitcher[0].throw_hand == 'R'
                hit.update(matchup_rating_vs_r: (((hit.ex_woba_vs_r)*0.2) + ((hit.wrc_plus_vs_r/1000)*0.2) + ((hit.ex_hard_contact_vs_r + hit.ex_iso_vs_r)*0.5) + (hit.ex_hr_per_fb_vs_r)*0.1))
            end
        end
        @home_hitters.each do |hit|
            if @away_pitcher[0].throw_hand == 'L'
                hit.update(matchup_rating_vs_l: (((hit.ex_woba_vs_l)*0.2) + ((hit.wrc_plus_vs_l/1000)*0.2) + ((hit.ex_hard_contact_vs_l + hit.ex_iso_vs_l)*0.5) + (hit.ex_hr_per_fb_vs_l)*0.1))
            elsif @away_pitcher[0].throw_hand == 'R'
                hit.update(matchup_rating_vs_r: (((hit.ex_woba_vs_r)*0.2) + ((hit.wrc_plus_vs_r/1000)*0.2) + ((hit.ex_hard_contact_vs_r + hit.ex_iso_vs_r)*0.5) + (hit.ex_hr_per_fb_vs_r)*0.1))
            end
        end
    end

    def handle_calculations
        get_home_and_away_players
        calc_ex_woba
        calc_ex_iso
        calc_ex_hc
        calc_ex_hr_per_fb
        calc_matchup_rating
    end
end