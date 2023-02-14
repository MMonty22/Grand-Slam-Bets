class GamesController < ApplicationController
    skip_before_action :authorize, only: :index
    
    def index
        games = Game.all
        render json: games, status: :created
    end

    def create
        game = Game.create(game_params)
        game.assign_players
        if game.valid?
            render json: game, status: :created
        else
            render json: {errors: game.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def game_params
        params.permit(:away_team, :home_team)
    end
end