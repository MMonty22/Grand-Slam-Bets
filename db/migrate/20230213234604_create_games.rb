class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :away_team
      t.string :home_team
      t.string :away_team_SP
      t.string :home_team_SP

      t.timestamps
    end
  end
end
