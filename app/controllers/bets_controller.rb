class BetsController < ApplicationController
    def index
        bets = Bet.all
        render json: bets, status: :created
    end

    def create
        bet = @current_user.bets.create(bet_params)
        if bet.valid?
            render json: bet, status: :created
        else
            render json: {errors: bet.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        bet = @current_user.bets.find_by(id: params[:id])
        bet.update!(bet_params)
        render json: bet
    end

    def destroy
        bet = @current_user.bets.find_by(id: params[:id])
        if bet
            bet.destroy
            head :no_content
        else
            render json: {error: "Bet not found"}, status: :not_found
        end
    end

    private

    def bet_params
        params.permit(:game_id, :category, :description, :odds)
    end
end